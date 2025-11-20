import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const exportInvoiceToPdf = async (
  elementId: string,
  filename = 'invoice.pdf',
) => {
  const element = document.getElementById(elementId)
  if (!element) return

  const canvas = await html2canvas(element)
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
  const imgWidth = canvas.width * ratio
  const imgHeight = canvas.height * ratio
  pdf.addImage(
    imgData,
    'PNG',
    (pageWidth - imgWidth) / 2,
    20,
    imgWidth,
    imgHeight,
  )
  pdf.save(filename)
}

