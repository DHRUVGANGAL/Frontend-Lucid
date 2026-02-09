import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { AnalysisResponse } from '../store/types';

/**
 * Generates a professional PDF report from the decision analysis data
 */
export const generateDecisionPDF = (decision: AnalysisResponse): void => {
    // Create PDF with explicit options
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredSpace: number = 30) => {
        if (yPosition > 270 - requiredSpace) {
            doc.addPage();
            yPosition = 20;
        }
    };

    // Helper function to add section header
    const addSectionHeader = (title: string) => {
        checkPageBreak(20);
        doc.setFillColor(75, 0, 130); // Purple
        doc.rect(14, yPosition - 6, pageWidth - 28, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 16, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 12;
    };

    // Helper function to add subsection
    const addSubsection = (title: string) => {
        checkPageBreak(15);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(75, 0, 130);
        doc.text(title, 14, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 8;
    };

    // Helper function for body text with word wrap
    const addBodyText = (text: string, indent: number = 14) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(text, pageWidth - indent - 14);
        lines.forEach((line: string) => {
            checkPageBreak(8);
            doc.text(line, indent, yPosition);
            yPosition += 6;
        });
    };

    // Helper function to get risk color
    const getRiskColor = (risk: string): [number, number, number] => {
        switch (risk) {
            case 'LOW': return [34, 197, 94]; // green
            case 'MEDIUM': return [245, 158, 11]; // amber
            case 'HIGH': return [239, 68, 68]; // red
            default: return [107, 114, 128]; // gray
        }
    };

    // ===== HEADER =====
    doc.setFillColor(20, 20, 30);
    doc.rect(0, 0, pageWidth, 45, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Decision Analysis Report', 14, 20);

    // Metadata row
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Project ID: ${decision.project_id.slice(0, 8)}...`, 14, 30);
    doc.text(`Decision ID: ${decision.decision_id.slice(0, 8)}...`, 80, 30);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 150, 30);

    // Risk Level Badge
    const [r, g, b] = getRiskColor(decision.risk_level);
    doc.setFillColor(r, g, b);
    doc.roundedRect(14, 34, 30, 8, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`${decision.risk_level} RISK`, 18, 39);

    // Confidence Score Badge
    doc.setFillColor(59, 130, 246);
    doc.roundedRect(48, 34, 35, 8, 2, 2, 'F');
    doc.text(`${Math.round(decision.confidence_score * 100)}% Confidence`, 51, 39);

    // Context Type Badge
    doc.setFillColor(139, 92, 246);
    doc.roundedRect(87, 34, 40, 8, 2, 2, 'F');
    doc.text(decision.context_type.replace('_', ' ').toUpperCase(), 90, 39);

    doc.setTextColor(0, 0, 0);
    yPosition = 55;

    // ===== EXECUTIVE SUMMARY =====
    addSectionHeader('EXECUTIVE SUMMARY');

    addSubsection('Overview');
    addBodyText(decision.explanation.overview);
    yPosition += 4;

    addSubsection('Recommendation');
    addBodyText(decision.explanation.recommendation);
    yPosition += 4;

    addSubsection('Technical Summary');
    addBodyText(decision.explanation.technical_summary);
    yPosition += 4;

    if (decision.explanation.key_risks.length > 0) {
        addSubsection('Key Risks');
        decision.explanation.key_risks.forEach((risk, index) => {
            addBodyText(`${index + 1}. ${risk}`, 18);
        });
    }
    yPosition += 6;

    // ===== BUSINESS CONTEXT =====
    addSectionHeader('BUSINESS CONTEXT');

    addSubsection('Business Intent');
    addBodyText(decision.normalized_data.business_intent);
    yPosition += 4;

    if (decision.normalized_data.assumptions.length > 0) {
        addSubsection('Assumptions');
        decision.normalized_data.assumptions.forEach((item, index) => {
            addBodyText(`${index + 1}. ${item}`, 18);
        });
    }

    if (decision.normalized_data.constraints.length > 0) {
        yPosition += 4;
        addSubsection('Constraints');
        decision.normalized_data.constraints.forEach((item, index) => {
            addBodyText(`${index + 1}. ${item}`, 18);
        });
    }

    if (decision.normalized_data.ambiguities.length > 0) {
        yPosition += 4;
        addSubsection('Ambiguities');
        decision.normalized_data.ambiguities.forEach((item, index) => {
            addBodyText(`${index + 1}. ${item}`, 18);
        });
    }
    yPosition += 6;

    // ===== REQUIREMENTS =====
    addSectionHeader('REQUIREMENTS');

    // Functional Requirements Table
    if (decision.requirements.functional_requirements.length > 0) {
        addSubsection('Functional Requirements');
        checkPageBreak(40);

        autoTable(doc, {
            startY: yPosition,
            head: [['ID', 'Description', 'Priority']],
            body: decision.requirements.functional_requirements.map(req => [
                req.id,
                req.description,
                req.priority
            ]),
            theme: 'striped',
            headStyles: { fillColor: [75, 0, 130], fontSize: 9 },
            bodyStyles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 20 }
            },
            margin: { left: 14, right: 14 },
        });

        yPosition = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    }

    // Non-Functional Requirements
    if (decision.requirements.non_functional_requirements.length > 0) {
        addSubsection('Non-Functional Requirements');
        checkPageBreak(40);

        autoTable(doc, {
            startY: yPosition,
            head: [['Category', 'Description']],
            body: decision.requirements.non_functional_requirements.map(req => [
                req.category,
                req.description
            ]),
            theme: 'striped',
            headStyles: { fillColor: [75, 0, 130], fontSize: 9 },
            bodyStyles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 35 },
                1: { cellWidth: 'auto' }
            },
            margin: { left: 14, right: 14 },
        });

        yPosition = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    }

    // User Stories
    if (decision.requirements.user_stories.length > 0) {
        addSubsection('User Stories');
        decision.requirements.user_stories.slice(0, 8).forEach((story, index) => {
            addBodyText(`${index + 1}. ${story}`, 18);
        });
        if (decision.requirements.user_stories.length > 8) {
            addBodyText(`... and ${decision.requirements.user_stories.length - 8} more user stories`, 18);
        }
    }
    yPosition += 6;

    // ===== ARCHITECTURE =====
    addSectionHeader('ARCHITECTURE');

    // Components Table
    if (decision.architecture.components.length > 0) {
        addSubsection('System Components');
        checkPageBreak(40);

        autoTable(doc, {
            startY: yPosition,
            head: [['Component', 'Type', 'Key Responsibilities']],
            body: decision.architecture.components.map(comp => [
                comp.name,
                comp.type,
                comp.responsibilities.slice(0, 2).join('; ') + (comp.responsibilities.length > 2 ? '...' : '')
            ]),
            theme: 'striped',
            headStyles: { fillColor: [75, 0, 130], fontSize: 9 },
            bodyStyles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 25 },
                2: { cellWidth: 'auto' }
            },
            margin: { left: 14, right: 14 },
        });

        yPosition = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    }

    // API Endpoints
    if (decision.architecture.api_definitions.length > 0) {
        addSubsection('API Endpoints');
        checkPageBreak(40);

        autoTable(doc, {
            startY: yPosition,
            head: [['Method', 'Path', 'Description']],
            body: decision.architecture.api_definitions.map(api => [
                api.method,
                api.path,
                api.description
            ]),
            theme: 'striped',
            headStyles: { fillColor: [75, 0, 130], fontSize: 9 },
            bodyStyles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 18 },
                1: { cellWidth: 50 },
                2: { cellWidth: 'auto' }
            },
            margin: { left: 14, right: 14 },
        });

        yPosition = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    }

    // Data Models
    if (decision.architecture.data_models.length > 0) {
        addSubsection('Data Models');
        decision.architecture.data_models.forEach(model => {
            checkPageBreak(20);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(`• ${model.name}`, 18, yPosition);
            yPosition += 5;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            const fieldsText = model.fields.slice(0, 5).join(', ') + (model.fields.length > 5 ? '...' : '');
            const lines = doc.splitTextToSize(fieldsText, pageWidth - 40);
            lines.forEach((line: string) => {
                doc.text(line, 22, yPosition);
                yPosition += 4;
            });
            yPosition += 2;
        });
    }
    yPosition += 6;

    // ===== IMPACT ANALYSIS =====
    addSectionHeader('IMPACT ANALYSIS');

    // Affected Components
    if (decision.impact.affected_components.length > 0) {
        addSubsection('Affected Components');
        addBodyText(decision.impact.affected_components.join(', '));
        yPosition += 4;
    }

    // File Changes
    if (decision.impact.file_changes.length > 0) {
        addSubsection('File Changes');
        checkPageBreak(40);

        autoTable(doc, {
            startY: yPosition,
            head: [['Type', 'Path', 'Reason']],
            body: decision.impact.file_changes.map(file => [
                file.change_type,
                file.path,
                file.reason
            ]),
            theme: 'striped',
            headStyles: { fillColor: [75, 0, 130], fontSize: 9 },
            bodyStyles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 20 },
                1: { cellWidth: 60 },
                2: { cellWidth: 'auto' }
            },
            margin: { left: 14, right: 14 },
        });

        yPosition = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    }

    // Database Migrations
    if (decision.impact.database_migrations.length > 0) {
        addSubsection('Database Migrations');
        decision.impact.database_migrations.forEach((migration, index) => {
            addBodyText(`${index + 1}. ${migration}`, 18);
        });
    }

    // Risk Assessment
    if (decision.impact.risk_assessment) {
        yPosition += 4;
        addSubsection('Risk Assessment');
        addBodyText(decision.impact.risk_assessment);
    }
    yPosition += 6;

    // ===== ESTIMATION =====
    addSectionHeader('ESTIMATION');

    // Summary Stats
    checkPageBreak(30);
    doc.setFillColor(245, 245, 250);
    doc.rect(14, yPosition - 4, pageWidth - 28, 20, 'F');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(75, 0, 130);

    const col1X = 20;
    const col2X = 70;
    const col3X = 120;

    doc.text('Total Hours', col1X, yPosition + 2);
    doc.text('Timeline', col2X, yPosition + 2);
    doc.text('Cost Estimate', col3X, yPosition + 2);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`${decision.estimation.total_hours}h`, col1X, yPosition + 12);
    doc.text(`${decision.estimation.timeline_weeks} weeks`, col2X, yPosition + 12);
    doc.text(decision.estimation.cost_estimate, col3X, yPosition + 12);

    yPosition += 24;

    // Task Breakdown
    if (decision.estimation.breakdown.length > 0) {
        addSubsection('Task Breakdown');
        checkPageBreak(40);

        autoTable(doc, {
            startY: yPosition,
            head: [['Task', 'Hours', 'Complexity']],
            body: decision.estimation.breakdown.map(task => [
                task.task_name,
                `${task.hours}h`,
                task.complexity
            ]),
            theme: 'striped',
            headStyles: { fillColor: [75, 0, 130], fontSize: 9 },
            bodyStyles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 20 },
                2: { cellWidth: 25 }
            },
            margin: { left: 14, right: 14 },
        });

        yPosition = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
    }

    // Assumptions Used
    if (decision.estimation.assumptions_used && decision.estimation.assumptions_used.length > 0) {
        addSubsection('Estimation Assumptions');
        decision.estimation.assumptions_used.forEach((assumption, index) => {
            addBodyText(`${index + 1}. ${assumption}`, 18);
        });
    }

    // ===== FOOTER =====
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
            `Page ${i} of ${totalPages} | Generated by Lucid AI`,
            pageWidth / 2,
            290,
            { align: 'center' }
        );
    }

    // Save the PDF - use simple direct save
    const filename = `decision-report-${decision.decision_id.slice(0, 8)}.pdf`;
    doc.save(filename);
};

export default generateDecisionPDF;


