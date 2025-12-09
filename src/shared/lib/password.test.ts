import { describe, it, expect } from 'vitest';
import { validatePassword } from './password';

describe('validatePassword', () => {
    it('should return valid for a correct password', () => {
        const result = validatePassword('securePassword123');
        expect(result.isValid).toBe(true);
    });

    it('should return invalid for a short password', () => {
        const result = validatePassword('12345');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('at least 6 characters');
    });

    it('should return invalid for an empty password', () => {
        const result = validatePassword('');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot be empty');
    });
});
