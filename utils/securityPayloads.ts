/**
 * Security Test Payloads
 * 
 * Provides security-focused test data for penetration testing
 * and vulnerability validation.
 * 
 * Categories:
 * - SQL Injection payloads
 * - XSS (Cross-Site Scripting) payloads
 * - Validation payloads (empty, whitespace)
 */
export class SecurityPayloads {
    
    // ==================== SQL Injection Payloads ====================
    
    /**
     * SQL Injection payload for email field
     * Attempts to bypass authentication using OR condition
     */
    static readonly SQL_INJECTION_EMAIL = "admin' OR '1'='1'--@example.com";
    
    /**
     * SQL Injection payload for password field
     * Attempts to bypass authentication using OR condition
     */
    static readonly SQL_INJECTION_PASSWORD = "' OR '1'='1";
    
    /**
     * SQL Injection payload with UNION attack
     * Attempts to extract data from database
     */
    static readonly SQL_INJECTION_UNION = "admin' UNION SELECT * FROM users--@example.com";
    
    // ==================== XSS (Cross-Site Scripting) Payloads ====================
    
    /**
     * XSS payload for email field
     * Attempts to execute JavaScript in the browser
     */
    static readonly XSS_EMAIL = "<script>alert('XSS')</script>@example.com";
    
    /**
     * XSS payload for password field
     * Attempts to execute JavaScript in the browser
     */
    static readonly XSS_PASSWORD = "<script>alert('XSS')</script>";
    
    /**
     * XSS payload with image tag
     * Alternative XSS attack vector
     */
    static readonly XSS_IMG_TAG = "<img src=x onerror=alert('XSS')>@example.com";
    
    // ==================== Validation Payloads ====================
    
    /**
     * Empty string for required field validation
     */
    static readonly EMPTY_STRING = "";
    
    /**
     * Whitespace-only string for validation testing
     */
    static readonly WHITESPACE_ONLY = "   ";
    
    /**
     * Invalid email format (missing @ and domain)
     */
    static readonly INVALID_EMAIL_FORMAT = "notanemail";
    
    /**
     * Email without domain
     */
    static readonly EMAIL_WITHOUT_DOMAIN = "user@";
    
    /**
     * Email without @ symbol
     */
    static readonly EMAIL_WITHOUT_AT = "userexample.com";
    
    // ==================== Helper Methods ====================
    
    /**
     * Gets all SQL injection payloads as an array
     * @returns Array of SQL injection payloads
     */
    static getAllSqlInjectionPayloads(): string[] {
        return [
            this.SQL_INJECTION_EMAIL,
            this.SQL_INJECTION_PASSWORD,
            this.SQL_INJECTION_UNION
        ];
    }
    
    /**
     * Gets all XSS payloads as an array
     * @returns Array of XSS payloads
     */
    static getAllXssPayloads(): string[] {
        return [
            this.XSS_EMAIL,
            this.XSS_PASSWORD,
            this.XSS_IMG_TAG
        ];
    }
    
    /**
     * Gets all validation payloads as an array
     * @returns Array of validation payloads
     */
    static getAllValidationPayloads(): string[] {
        return [
            this.EMPTY_STRING,
            this.WHITESPACE_ONLY,
            this.INVALID_EMAIL_FORMAT,
            this.EMAIL_WITHOUT_DOMAIN,
            this.EMAIL_WITHOUT_AT
        ];
    }
}