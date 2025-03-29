import React, { useState } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import { generateSHA256Hash } from '../utils/hashUtils';

interface FormData {
  projectName: string;
  domainName: string;
  n8nWebhookDomain: string;
  redisPassword: string;
  postgresqlPassword: string;
  encryptionKey: string;
}

const ConfigurationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    domainName: '',
    n8nWebhookDomain: '',
    redisPassword: '',
    postgresqlPassword: '',
    encryptionKey: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedDBCode, setGeneratedDBCode] = useState<string>('');
  const [generatedN8NCode, setGeneratedN8NCode] = useState<string>('');
  const [showDBCode, setShowDBCode] = useState<boolean>(false);
  const [showN8NCode, setShowN8NCode] = useState<boolean>(false);

  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const generatePasswordHash = (field: keyof FormData) => {
    const hash = generateSHA256Hash();
    updateFormField(field, hash);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Check required fields
    if (!formData.projectName) newErrors.projectName = 'Project Name is required';
    if (!formData.domainName) newErrors.domainName = 'Domain Name is required';
    if (!formData.n8nWebhookDomain) newErrors.n8nWebhookDomain = 'N8N Webhook Domain is required';
    if (!formData.redisPassword) newErrors.redisPassword = 'Redis Password is required';
    if (!formData.postgresqlPassword) newErrors.postgresqlPassword = 'PostgreSQL Password is required';
    if (!formData.encryptionKey) newErrors.encryptionKey = 'Encryption Key is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateDBCode = () => {
    if (validateForm()) {
      const template = `
PROJECT_NAME=${formData.projectName}
DOMAIN=${formData.domainName}
REDIS_PASSWORD=${formData.redisPassword}
POSTGRES_PASSWORD=${formData.postgresqlPassword}
ENCRYPTION_KEY=${formData.encryptionKey}
      `.trim();
      
      setGeneratedDBCode(template);
      setShowDBCode(true);
      setShowN8NCode(false);
    }
  };

  const generateN8NCode = () => {
    if (validateForm()) {
      const template = `
PROJECT_NAME=${formData.projectName}
N8N_WEBHOOK_DOMAIN=${formData.n8nWebhookDomain}
ENCRYPTION_KEY=${formData.encryptionKey}
      `.trim();
      
      setGeneratedN8NCode(template);
      setShowN8NCode(true);
      setShowDBCode(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  return (
    <form className="max-w-2xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-8 text-purple-300 text-center">Configuration Form</h2>
      
      {/* Regular text inputs */}
      <TextInput
        id="projectName"
        label="Project Name"
        value={formData.projectName}
        onChange={(value) => updateFormField('projectName', value)}
        required
      />
      {errors.projectName && <p className="text-red-400 text-sm mt-1 mb-3">{errors.projectName}</p>}
      
      <TextInput
        id="domainName"
        label="Domain Name"
        value={formData.domainName}
        onChange={(value) => updateFormField('domainName', value)}
        required
      />
      {errors.domainName && <p className="text-red-400 text-sm mt-1 mb-3">{errors.domainName}</p>}
      
      <TextInput
        id="n8nWebhookDomain"
        label="N8N Webhook Domain"
        value={formData.n8nWebhookDomain}
        onChange={(value) => updateFormField('n8nWebhookDomain', value)}
        required
      />
      {errors.n8nWebhookDomain && <p className="text-red-400 text-sm mt-1 mb-3">{errors.n8nWebhookDomain}</p>}
      
      {/* Password inputs with generate buttons */}
      <div className="my-6">
        <PasswordInput
          id="redisPassword"
          label="Redis Password"
          value={formData.redisPassword}
          onChange={(value) => updateFormField('redisPassword', value)}
          onGenerate={() => generatePasswordHash('redisPassword')}
          required
        />
        {errors.redisPassword && <p className="text-red-400 text-sm mt-1 mb-3">{errors.redisPassword}</p>}
      </div>
      
      <div className="my-6">
        <PasswordInput
          id="postgresqlPassword"
          label="PostgreSQL Password"
          value={formData.postgresqlPassword}
          onChange={(value) => updateFormField('postgresqlPassword', value)}
          onGenerate={() => generatePasswordHash('postgresqlPassword')}
          required
        />
        {errors.postgresqlPassword && <p className="text-red-400 text-sm mt-1 mb-3">{errors.postgresqlPassword}</p>}
      </div>
      
      <div className="my-6">
        <PasswordInput
          id="encryptionKey"
          label="Encryption Key"
          value={formData.encryptionKey}
          onChange={(value) => updateFormField('encryptionKey', value)}
          onGenerate={() => generatePasswordHash('encryptionKey')}
          required
        />
        {errors.encryptionKey && <p className="text-red-400 text-sm mt-1 mb-3">{errors.encryptionKey}</p>}
      </div>
      
      <div className="mt-10 flex gap-4">
        <button
          type="button"
          onClick={generateDBCode}
          className="flex-1 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Gerar Código BD
        </button>
        <button
          type="button"
          onClick={generateN8NCode}
          className="flex-1 py-3 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
        >
          Gerar Código N8N
        </button>
      </div>

      {showDBCode && (
        <div className="mt-6 bg-gray-900 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2 text-white">Generated Database Code</h3>
          <pre className="bg-gray-950 p-3 rounded text-green-400 overflow-x-auto text-sm">
            {generatedDBCode}
          </pre>
          <button
            type="button"
            onClick={() => copyToClipboard(generatedDBCode)}
            className="mt-3 py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Copiar código
          </button>
        </div>
      )}

      {showN8NCode && (
        <div className="mt-6 bg-gray-900 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2 text-white">Generated N8N Code</h3>
          <pre className="bg-gray-950 p-3 rounded text-green-400 overflow-x-auto text-sm">
            {generatedN8NCode}
          </pre>
          <button
            type="button"
            onClick={() => copyToClipboard(generatedN8NCode)}
            className="mt-3 py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Copiar código
          </button>
        </div>
      )}
    </form>
  );
};

export default ConfigurationForm; 