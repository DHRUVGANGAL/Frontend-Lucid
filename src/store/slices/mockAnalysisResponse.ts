import type { AnalysisResponse } from '../types';

/**
 * Mock analysis response for development purposes.
 * This avoids expensive API calls during development.
 */
export const mockAnalysisResponse: AnalysisResponse = {
    "project_id": "1cad9613-b82c-4c3e-8294-f28474800136",
    "decision_id": "160339ec-fb03-48f8-8538-c922dcbe3fd6",
    "context_type": "change_request",
    "confidence_score": 0.95,
    "normalized_data": {
        "business_intent": "To modify the HealthConnect system to better align with updated hospital operational processes, accommodate increased patient volume, and improve patient engagement through simplified workflows and enhanced notification systems.",
        "explicit_requirements": [
            "Mandatory mobile number verification using OTP for patient registration",
            "Removal of email-only registration option",
            "Addition of patient age and gender as required fields during registration",
            "Implementation of guest booking functionality allowing appointments without account creation",
            "Configurable appointment duration per doctor with automatic buffer times",
            "Restriction on same-day multiple bookings by the same patient",
            "Support for doctor availability across multiple clinic locations",
            "Ability for doctors to block slots for emergencies",
            "Mandatory SMS notifications for appointment confirmation",
            "Reminder notifications to be sent 24 hours and 2 hours before appointment time",
            "Daily appointment summary report for hospital admins",
            "Export reports only in Excel format for initial release"
        ],
        "assumptions": [
            "A reliable SMS gateway service is available and integrated for OTP and mandatory notifications",
            "Hospital-provided credentials for doctor logins are managed in an existing system accessible to HealthConnect",
            "The system can uniquely identify patients during guest booking to prevent duplicate same-day bookings",
            "Phase 1 delivery is the current priority for the initial release"
        ],
        "constraints": [
            "Advanced analytics are removed from the Phase 1 scope",
            "Detailed doctor qualifications must be removed from patient-facing screens",
            "Report exports are restricted to Excel format only for the initial release",
            "The project timeline is extended by an estimated 2–3 weeks",
            "Email-only registration is no longer permitted"
        ],
        "ambiguities": [
            "The specific duration or logic for 'automatic buffer time' is not defined",
            "The technical protocol for 'hospital-provided credentials' (e.g., SSO, LDAP) is not specified",
            "The method for managing and defining 'multiple clinic locations' is unclear",
            "It is not specified how guest booking data will be reconciled with future registered patient accounts"
        ]
    },
    "rule_results": {
        "triggered_rules": [
            "risk_medium_change_request"
        ],
        "risk_level": "MEDIUM",
        "effort_multiplier": 1.0,
        "flags": []
    },
    "requirements": {
        "functional_requirements": [
            {
                "id": "FR-01",
                "description": "Implement mandatory mobile number verification using OTP for all patient registrations.",
                "priority": "High"
            },
            {
                "id": "FR-02",
                "description": "Update registration forms to include mandatory fields for patient age and gender.",
                "priority": "High"
            },
            {
                "id": "FR-03",
                "description": "Develop guest booking functionality to allow patients to schedule appointments without creating a system account.",
                "priority": "High"
            },
            {
                "id": "FR-04",
                "description": "Enable configurable appointment durations per doctor with automatic buffer time logic.",
                "priority": "Medium"
            },
            {
                "id": "FR-05",
                "description": "Implement a validation rule to restrict the same patient from making multiple bookings on the same day.",
                "priority": "Medium"
            },
            {
                "id": "FR-06",
                "description": "Support doctor availability management across multiple clinic locations.",
                "priority": "Medium"
            },
            {
                "id": "FR-07",
                "description": "Provide doctors with the ability to block specific time slots for emergency cases.",
                "priority": "High"
            },
            {
                "id": "FR-08",
                "description": "Automate SMS notifications for appointment confirmations and reminders at 24-hour and 2-hour intervals.",
                "priority": "High"
            },
            {
                "id": "FR-09",
                "description": "Generate a daily appointment summary report for hospital administrators.",
                "priority": "Medium"
            },
            {
                "id": "FR-10",
                "description": "Restrict report exports exclusively to Excel format for the initial release.",
                "priority": "Low"
            },
            {
                "id": "FR-11",
                "description": "Remove the option for email-only registration and remove detailed doctor qualifications from patient-facing screens.",
                "priority": "High"
            }
        ],
        "non_functional_requirements": [
            {
                "category": "Scalability",
                "description": "The system must be optimized to accommodate increased patient volume and operational load."
            },
            {
                "category": "Security",
                "description": "Authentication for doctors must utilize hospital-provided credentials via existing management systems."
            },
            {
                "category": "Reliability",
                "description": "The system must integrate with a reliable SMS gateway to ensure delivery of OTPs and mandatory notifications."
            },
            {
                "category": "Performance",
                "description": "The system must uniquely identify patients during guest booking to prevent duplicate same-day bookings."
            },
            {
                "category": "Constraint",
                "description": "Advanced analytics and detailed doctor qualifications are excluded from the Phase 1 scope."
            }
        ],
        "user_stories": [
            "As a patient, I want to register using my mobile number and OTP, so that my account is verified and secure without requiring an email.",
            "As a patient, I want to book an appointment as a guest, so that I can schedule a visit quickly without the need for account creation.",
            "As a doctor, I want to configure my appointment duration and buffer times, so that my schedule accurately reflects my consultation pace.",
            "As a doctor, I want to manage my availability across different clinic locations, so that patients can find me at the correct site.",
            "As a doctor, I want to block slots for emergencies, so that I can handle urgent medical situations without scheduling conflicts.",
            "As a patient, I want to receive SMS reminders 24 hours and 2 hours before my appointment, so that I am reminded of my upcoming visit.",
            "As a hospital admin, I want to receive a daily appointment summary report, so that I can monitor hospital operations and patient flow.",
            "As a hospital admin, I want to export reports in Excel format, so that I can perform data analysis using standard spreadsheet tools."
        ]
    },
    "architecture": {
        "components": [
            {
                "name": "Identity & Access Management Service",
                "type": "Microservice",
                "responsibilities": [
                    "Handles mobile number verification via OTP (FR-01)",
                    "Integrates with hospital SSO for doctor authentication",
                    "Manages patient registration and profile updates including age and gender (FR-02)",
                    "Enforces removal of email-only registration (FR-11)"
                ]
            },
            {
                "name": "Appointment Management Service",
                "type": "Microservice",
                "responsibilities": [
                    "Orchestrates guest booking workflows (FR-03)",
                    "Calculates appointment slots based on doctor-specific duration and buffer logic (FR-04)",
                    "Enforces business rule: one booking per patient per day (FR-05)",
                    "Manages appointment lifecycle (Scheduled, Completed, Cancelled)"
                ]
            },
            {
                "name": "Provider & Schedule Service",
                "type": "Microservice",
                "responsibilities": [
                    "Manages doctor availability across multiple clinic locations (FR-06)",
                    "Provides interface for doctors to block emergency time slots (FR-07)",
                    "Maintains doctor-to-location mapping and base schedule configurations"
                ]
            },
            {
                "name": "Notification & Messaging Service",
                "type": "Microservice",
                "responsibilities": [
                    "Integrates with external SMS Gateway for OTP and notifications (Reliability NFR)",
                    "Triggers automated SMS reminders at 24-hour and 2-hour intervals (FR-08)",
                    "Handles appointment confirmation messages"
                ]
            },
            {
                "name": "Reporting & Analytics Service",
                "type": "Microservice",
                "responsibilities": [
                    "Aggregates daily appointment data for hospital administrators (FR-09)",
                    "Generates and exports reports exclusively in Excel format (FR-10)",
                    "Scheduled job execution for daily summary generation"
                ]
            }
        ],
        "data_models": [
            {
                "name": "Patient",
                "fields": [
                    "id: UUID",
                    "mobile_number: String (Unique)",
                    "age: Integer",
                    "gender: Enum(MALE, FEMALE, OTHER)",
                    "is_guest: Boolean",
                    "is_verified: Boolean",
                    "created_at: Timestamp"
                ]
            },
            {
                "name": "DoctorScheduleConfiguration",
                "fields": [
                    "doctor_id: UUID",
                    "location_id: UUID",
                    "slot_duration_minutes: Integer",
                    "buffer_time_minutes: Integer",
                    "day_of_week: Integer",
                    "start_time: Time",
                    "end_time: Time"
                ]
            },
            {
                "name": "Appointment",
                "fields": [
                    "id: UUID",
                    "patient_id: UUID (Nullable for Guest)",
                    "guest_mobile: String (Nullable)",
                    "doctor_id: UUID",
                    "location_id: UUID",
                    "start_time: Timestamp",
                    "end_time: Timestamp",
                    "status: Enum(BOOKED, EMERGENCY_BLOCK, CANCELLED)",
                    "booking_date: Date (For FR-05 validation)"
                ]
            }
        ],
        "api_definitions": [
            {
                "method": "POST",
                "path": "/api/v1/auth/otp/request",
                "description": "Initiates OTP generation and SMS delivery for mobile verification."
            },
            {
                "method": "POST",
                "path": "/api/v1/appointments/guest",
                "description": "Allows booking an appointment without a registered account using mobile verification."
            },
            {
                "method": "PATCH",
                "path": "/api/v1/provider/schedule/block",
                "description": "Allows doctors to mark specific time ranges as blocked for emergency cases."
            },
            {
                "method": "GET",
                "path": "/api/v1/reports/daily-summary/export",
                "description": "Generates and returns an Excel file containing the daily appointment summary."
            },
            {
                "method": "PUT",
                "path": "/api/v1/provider/settings",
                "description": "Updates doctor-specific slot durations and buffer time configurations."
            }
        ],
        "diagram_mermaid": "graph TD\n  Patient[Patient/Guest] -->|Mobile/OTP| IAM[Identity Service]\n  Patient -->|Book| Appt[Appointment Service]\n  Doctor[Doctor/SSO] -->|Manage Schedule| Prov[Provider Service]\n  Appt -->|Validate| Prov\n  Appt -->|Check Duplicates| DB[(Database)]\n  Appt -->|Trigger| Notif[Notification Service]\n  Notif -->|SMS| SMSG[SMS Gateway]\n  Admin[Admin] -->|Request Report| Rep[Reporting Service]\n  Rep -->|Query| DB\n  Rep -->|Export| Excel[Excel File]"
    },
    "impact": {
        "affected_components": [
            "Identity & Access Management Service",
            "Appointment Management Service",
            "Provider & Schedule Service",
            "Notification & Messaging Service",
            "Reporting & Analytics Service"
        ],
        "file_changes": [
            {
                "path": "iam-service/models/patient.py",
                "change_type": "MODIFY",
                "reason": "Update Patient model to include mobile_number, age, gender, and verification flags; remove email-only registration constraints."
            },
            {
                "path": "iam-service/services/otp_service.py",
                "change_type": "CREATE",
                "reason": "Implement logic for generating, storing, and validating OTPs for mobile verification."
            },
            {
                "path": "appointment-service/services/booking_manager.py",
                "change_type": "CREATE",
                "reason": "Implement guest booking workflows and business rule validation for one booking per patient per day."
            },
            {
                "path": "appointment-service/utils/slot_engine.py",
                "change_type": "CREATE",
                "reason": "Develop logic to calculate available slots dynamically based on doctor-specific duration and buffer settings."
            },
            {
                "path": "provider-service/controllers/schedule_controller.py",
                "change_type": "MODIFY",
                "reason": "Add endpoints for emergency time slot blocking and doctor-to-location mapping management."
            },
            {
                "path": "notification-service/adapters/sms_gateway.py",
                "change_type": "CREATE",
                "reason": "Integrate with external SMS provider for OTP delivery and appointment notifications."
            },
            {
                "path": "notification-service/jobs/reminder_scheduler.py",
                "change_type": "CREATE",
                "reason": "Implement background jobs for 24-hour and 2-hour automated SMS reminders."
            },
            {
                "path": "reporting-service/exporters/excel_generator.py",
                "change_type": "CREATE",
                "reason": "Implement Excel-only report generation logic for daily appointment summaries."
            }
        ],
        "database_migrations": [
            "Alter table patients: add column mobile_number (unique), age (int), gender (enum), is_guest (bool), is_verified (bool); drop email requirement.",
            "Create table doctor_schedule_configurations: doctor_id (uuid), location_id (uuid), slot_duration (int), buffer_time (int), schedule_rules (jsonb).",
            "Create table appointments: id (uuid), patient_id (uuid, nullable), guest_mobile (string), status (enum), booking_date (date), start_time (timestamp), end_time (timestamp).",
            "Add unique index on appointments (patient_id, booking_date) where status != 'CANCELLED' to enforce daily booking limit."
        ],
        "risk_assessment": "High risk associated with the transition from email-based to mobile-based identity management. Integration with external Hospital SSO and SMS Gateways introduces third-party dependencies that may affect system availability. Complex concurrency requirements for slot calculation and the 'one booking per day' rule require robust locking mechanisms to prevent race conditions."
    },
    "estimation": {
        "total_hours": 158.0,
        "breakdown": [
            {
                "task_name": "IAM Service: Patient Model Refactor & OTP Service Implementation",
                "hours": 20.0,
                "complexity": "Medium"
            },
            {
                "task_name": "Appointment Service: Booking Manager & Slot Engine Logic",
                "hours": 36.0,
                "complexity": "High"
            },
            {
                "task_name": "Provider Service: Schedule Controller & Emergency Blocking",
                "hours": 12.0,
                "complexity": "Medium"
            },
            {
                "task_name": "Notification Service: SMS Gateway Integration & Reminder Jobs",
                "hours": 28.0,
                "complexity": "Medium"
            },
            {
                "task_name": "Reporting Service: Excel Generator Implementation",
                "hours": 8.0,
                "complexity": "Low"
            },
            {
                "task_name": "Database Migrations: Schema Updates & Indexing",
                "hours": 14.0,
                "complexity": "Medium"
            },
            {
                "task_name": "Quality Assurance: Integration & Concurrency Testing",
                "hours": 24.0,
                "complexity": "High"
            },
            {
                "task_name": "Documentation, Code Review & Deployment Overhead",
                "hours": 16.0,
                "complexity": "Low"
            }
        ],
        "cost_estimate": "$18,960 (Based on a blended rate of $120/hr)",
        "timeline_weeks": 3.0,
        "assumptions_used": [
            "Two full-time senior engineers assigned to the project.",
            "SMS Gateway provider (third-party) has a stable and documented API.",
            "Hospital SSO integration follows standard OIDC or SAML protocols.",
            "No major changes to existing frontend components are included in this backend-focused estimate.",
            "Development environment and CI/CD pipelines are already established and functional."
        ]
    },
    "explanation": {
        "overview": "This project involves a significant modernization of the identity management system, transitioning from email-based to mobile-based authentication. The scope encompasses 11 functional and 5 non-functional requirements, with an estimated delivery timeline of 3 weeks and a budget of $18,960. The initiative aims to enhance user accessibility while integrating with critical hospital infrastructure.",
        "key_risks": [
            "High risk associated with the transition from email-based to mobile-based identity management.",
            "Third-party dependencies on Hospital SSO and SMS Gateways that may impact system availability and uptime.",
            "Potential for race conditions during slot calculation and the enforcement of the 'one booking per day' business rule.",
            "Complex concurrency requirements necessitating robust locking mechanisms to ensure data integrity."
        ],
        "recommendation": "Proceed with caution. The project is technically viable but requires a strong focus on integration testing with third-party providers and rigorous validation of the concurrency logic to prevent booking errors.",
        "technical_summary": "The technical architecture consists of 5 components, 3 data models, and 5 API endpoints. Implementation will involve 8 file changes across 5 affected components. The primary technical challenge lies in the backend logic for slot calculation and the implementation of distributed locking mechanisms to handle high-concurrency booking requests safely."
    },
    "risk_level": "medium"
};
