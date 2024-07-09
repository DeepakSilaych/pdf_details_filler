import React from 'react';
import DynamicContentDisplay from './dynamic/DynamicContentDisplay';
import DynamicContentForm from './dynamic/DynamicContentForm';
import { DynamicContentProvider } from './dynamic/DynamicContentProvider';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const data = `
<!DOCTYPE html>
<html>
<head>
    <title>data1</title>
<body>
    <h1>Internship</h1>
    <p>Internship is a period of work experience offered by an [text:company] for a duration of [date:months] months. I am a [option:student|graduate] of [text:course] and I am looking for an internship in the field of [text:field].</p>
    <p>My skills include [text:skills]. I am a [option:fast|pace|slow] learner and I am willing to learn new things. I am a [option:team player|individual] and I can work under pressure.</p>
    <p>
        I am looking forward to hearing from you soon. You can contact me at [email:email] or [phone:phone].
    </p>

    <h2>Internship</h2>
    <p>I would like to talk about my [option_if:intership=internship at company|friends=friends at school|else=family at home].</p>
</body>
</html>
`;

function Pdf_filler() {
  const handleDownloadPDF = () => {
    const content = document.getElementById('dynamic-content');
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('draftai.pdf');
    });
  };

  return (
    <DynamicContentProvider initialContent={data}>
      <div className='h-full w-full text-lg text-black flex'>
        <div className='w-3/4 bg-orange-100'>
          <div className='w-11/12 h-full rounded p-10 mx-auto bg-white' id='dynamic-content'>
            <DynamicContentDisplay />
          </div>
        </div>
        <div className='text-black w-1/4 p-5 flex flex-col bg-white shadow-2xl overflow-y-scroll'>
          <DynamicContentForm />
          <button onClick={handleDownloadPDF} className='mt-4 p-2 bg-blue-500 text-white rounded'>
            Download as PDF
          </button>
        </div>
      </div>
    </DynamicContentProvider>
  );
}

export default Pdf_filler;
