import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generatePhysicianSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateAggregateSchema
} from '../utils/structuredData';

interface StructuredDataProps {
  type?: 'organization' | 'localBusiness' | 'physician' | 'service' | 'breadcrumb' | 'faq' | 'aggregate';
  data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'aggregate', data }) => {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return generateOrganizationSchema();
      case 'localBusiness':
        return generateLocalBusinessSchema();
      case 'physician':
        return generatePhysicianSchema();
      case 'service':
        return data ? generateServiceSchema(data) : null;
      case 'breadcrumb':
        return data ? generateBreadcrumbSchema(data) : null;
      case 'faq':
        return data ? generateFAQSchema(data) : null;
      case 'aggregate':
      default:
        return generateAggregateSchema();
    }
  };

  const schema = getSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
