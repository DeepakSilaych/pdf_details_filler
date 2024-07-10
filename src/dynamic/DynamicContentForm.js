import React, { useContext } from 'react';
import { DynamicContentContext } from './DynamicContentProvider';

const TextInput = ({ pair, index, onChange }) => (
  <>
    <label className='h-full text-sm flex flex-col justify-center mr-4' htmlFor={`input-${index}`}>{pair.original.split(':')[1]}</label>
    <input
      id={`input-${index}`}
      type='text'
      value={pair.value}
      placeholder={pair.value}
      className='h-full text-black mb-10 p-2 bg-slate-100'
      onChange={(e) => onChange(index, e.target.value)}
    />
  </>
);

const NumberInput = ({ pair, index, onChange }) => (
  <>
    <label className='h-full text-sm flex flex-col justify-center mr-4' htmlFor={`input-${index}`}>{pair.original.split(':')[1]}</label>
    <input
      id={`input-${index}`}
      type='number'
      value={pair.value}
      placeholder={pair.value}
      className='h-full text-black mb-10 p-2 bg-slate-100'
      onChange={(e) => onChange(index, e.target.value)}
    />
  </>
);

const OptionInput = ({ pair, index, onChange }) => (
  <>
    <label className='h-full text-sm flex flex-col justify-center mr-4' htmlFor={`input-${index}`}>{pair.original.split(':')[1]}</label>
    <select
      id={`input-${index}`}
      value={pair.value}
      className='h-full text-black mb-10 p-2 bg-slate-100'
      onChange={(e) => onChange(index, e.target.value)}
    >
      {pair.original.split(':')[1].split('|').map((option, i) => (
        <option key={i} value={option}>{option}</option>
      ))}
    </select>
  </>
);

const OptionIFInput = ({ pair, index, onChange }) => (
  <>
    <label className='h-full text-sm flex mr-4' htmlFor={`input-${index}`}>
      {pair.original.split('::')[1].split('===')[0]}
    </label>
    <select
      id={`input-${index}`}
      value={pair.value}
      className='h-full text-black mb-10 p-2 bg-slate-100'
      onChange={(e) => onChange(index, e.target.value)}
    >
      {console.log(pair.original.split('::')[1].split('===')[1].split('|'))}
      {pair.original.split('::')[1].split('===')[1].split('|').map((option, i) => (
        <option key={i} value={option.split('>>')[1]}>{option.split('>>')[0]}</option>
      ))}
    </select>
  </>
);

const UrlInput = ({ pair, index, onChange }) => (
  <>
    <label className='h-full text-sm flex flex-col justify-center mr-4' htmlFor={`input-${index}`}>{pair.original.split(':')[1]}</label>
    <input
      id={`input-${index}`}
      type='url'
      value={pair.value}
      placeholder={pair.value}
      className='h-full text-black mb-10 p-2 bg-slate-100'
      onChange={(e) => onChange(index, e.target.value)}
    />
  </>
);

const DateInput = ({ pair, index, onChange }) => (
  <>
    <label className='h-full text-sm flex flex-col justify-center mr-4' htmlFor={`input-${index}`}>{pair.original.split(':')[1]}</label>
    <input
      id={`input-${index}`}
      type='date'
      value={pair.value}
      placeholder={pair.value}
      className='h-full text-black mb-10 p-2 bg-slate-100'
      onChange={(e) => onChange(index, e.target.value)}
    />
  </>
);

const EmailInput = ({ pair, index, onChange }) => (
  <>
    <label className='h-full text-sm flex flex-col justify-center mr-4' htmlFor={`input-${index}`}>{pair.original.split(':')[1]}</label>
    <input
      id={`input-${index}`}
      type='email'
      value={pair.value}
      placeholder={pair.value}
      className='h-full text-black mb-10 p-2 bg-slate-100'
      onChange={(e) => onChange(index, e.target.value)}
    />
  </>
);

const PhoneInput = ({ pair, index, onChange }) => (
  <>
    <label className='h-full text-sm flex flex-col justify-center mr-4' htmlFor={`input-${index}`}>{pair.original.split(':')[1]}</label>
    <input
      id={`input-${index}`}
      type='tel'
      value={pair.value}
      placeholder={pair.value}
      className='h-full text-black mb-10 p-2 bg-slate-100'
      onChange={(e) => onChange(index, e.target.value)}
    />
  </>
);

const DynamicContentForm = () => {
  const { keyValuePairs, handleInputChange } = useContext(DynamicContentContext);

  const renderFormInput = (pair, index) => {
    switch (pair.type) {
      case 'option':
        return <OptionInput pair={pair} index={index} onChange={handleInputChange} />;
      case 'option_if':
        return <OptionIFInput pair={pair} index={index} onChange={handleInputChange} />;
      case 'url':
        return <UrlInput pair={pair} index={index} onChange={handleInputChange} />;
      case 'date':
        return <DateInput pair={pair} index={index} onChange={handleInputChange} />;
      case 'email':
        return <EmailInput pair={pair} index={index} onChange={handleInputChange} />;
      case 'phone':
        return <PhoneInput pair={pair} index={index} onChange={handleInputChange} />;
      case 'int':
        return <NumberInput pair={pair} index={index} onChange={handleInputChange} />;
      default:
        return <TextInput pair={pair} index={index} onChange={handleInputChange} />;
    }
  };

  return (
    <>
      {keyValuePairs.map((pair, index) => (
        <div className="flex flex-col w-full justify-start align-middle h-fit" key={index}>
          {renderFormInput(pair, index)}
        </div>
      ))}
    </>
  );
};

export default DynamicContentForm;
