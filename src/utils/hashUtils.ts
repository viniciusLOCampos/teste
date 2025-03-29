import CryptoJS from 'crypto-js';

/**
 * Generates a SHA-256 hash from the input string and removes special characters
 * 
 * @param input - The string to hash
 * @returns A SHA-256 hash without special characters
 */
export const generateSHA256Hash = (input: string = ''): string => {
  // If empty, generate hash from random string
  const valueToHash = input || Math.random().toString(36).substring(2);
  
  // Generate SHA-256 hash
  const hash = CryptoJS.SHA256(valueToHash).toString();
  
  // Remove special characters if needed (keeping only alphanumeric)
  return hash.replace(/[^a-zA-Z0-9]/g, '');
}; 