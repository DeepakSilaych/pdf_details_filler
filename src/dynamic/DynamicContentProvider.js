import React, { useState, useContext, createContext } from 'react';

const DynamicContentContext = createContext();

const DynamicContentProvider = ({ initialContent, children }) => {
  const parseContent = (content) => {
    const regex = /\[([^\]:]*):([^\]]+)\]/g;
    let match;
    const keyValuePairs = [];

    while ((match = regex.exec(content)) !== null) {
      const type = match[1].toLowerCase();
      const value = match[2];
      const inputType = getInputType(type);

      keyValuePairs.push({ type, value, inputType, original: match[0].slice(1, -1)});
    }

    return keyValuePairs;
  };

  const getInputType = (type) => {
    switch (type) {
      case 'url':
        return 'url';
      case 'date':
        return 'date';
      case 'email':
        return 'email';
      case 'phone':
        return 'tel';
      case 'int':
        return 'number';
      case 'option':
        return 'option';
      default:
        return 'text';
    }
  };

  const [keyValuePairs, setKeyValuePairs] = useState(parseContent(initialContent));

  const handleInputChange = (index, newValue) => {
    const updatedPairs = [...keyValuePairs];
    updatedPairs[index].value = newValue;
    setKeyValuePairs(updatedPairs);
  };

  const generateContent = () => {
    let updatedContent = initialContent;
    keyValuePairs.forEach(pair => {
      updatedContent = updatedContent.replace(pair.original, pair.value)
    });
    return updatedContent;
  };

  return (
    <DynamicContentContext.Provider value={{ keyValuePairs, handleInputChange, generateContent }}>
      {children}
    </DynamicContentContext.Provider>
  );
};

export { DynamicContentProvider, DynamicContentContext };
