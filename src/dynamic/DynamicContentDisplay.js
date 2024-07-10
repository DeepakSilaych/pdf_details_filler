import React, { useContext } from 'react';
import { DynamicContentContext } from './DynamicContentProvider';

const DynamicContentDisplay = () => {
  const { generateContent } = useContext(DynamicContentContext);

  return (
    <div dangerouslySetInnerHTML={{ __html: generateContent() }} />
  );
};

export default DynamicContentDisplay;