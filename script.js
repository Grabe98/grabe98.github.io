// Obtén referencia al elemento canvas
var pdfViewer = document.getElementById('pdfViewer');

// URL del archivo PDF en tu repositorio de GitHub
var pdfUrl = 'pdf1.pdf';

// Crea un visor de PDF utilizando la biblioteca pdf.js
pdfjsLib.getDocument(pdfUrl).promise.then(function(pdfDoc) {
    var pageNum = 1;
    var numPages = pdfDoc.numPages;
    var pdfCanvas = pdfViewer;

    function renderPage(pageNum) {
        pdfDoc.getPage(pageNum).then(function(page) {
            var viewport = page.getViewport({ scale: 1 });
            var canvas = pdfCanvas;
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }

    // Renderiza la primera página inicialmente
    renderPage(pageNum);

    // Función para cambiar a la página siguiente
    function nextPage() {
        if (pageNum < numPages) {
            pageNum++;
            renderPage(pageNum);
        }
    }

    // Función para cambiar a la página anterior
    function prevPage() {
        if (pageNum > 1) {
            pageNum--;
            renderPage(pageNum);
        }
    }

    // Asigna eventos a los botones de siguiente y anterior
    document.getElementById('prevButton').addEventListener('click', prevPage);
    document.getElementById('nextButton').addEventListener('click', nextPage);
});
