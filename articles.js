 function filterArticles(category) {
            const articles = document.querySelectorAll('.article-wrapper');
            articles.forEach(article => {
                if (category === 'all') {
                    article.classList.add('visible');
                } else {
                    if (article.getAttribute('data-category') === category) {
                        article.classList.add('visible');
                    } else {
                        article.classList.remove('visible');
                    }
                }
            });
        }

        function downloadPDF(pdfPath) {
            const link = document.createElement('a');
            link.href = pdfPath;
            link.download = pdfPath.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }