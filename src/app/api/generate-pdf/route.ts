import puppeteer from "puppeteer";

function getAbsoluteUrl(relativePath: string): string {
  const baseUrl = "http://localhost:3000"; //ganti
  return `${baseUrl}${relativePath}`;
}

export async function POST(req: Request) {
  const {
    title,
    author,
    content,
    summary,
    keywords,
    references,
    category,
    coverImage,
  } = await req.json();

  try {
    const coverImageUrl = getAbsoluteUrl(coverImage);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(`
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            /* Mengatur margin untuk halaman PDF */
            @page {
              margin: 30mm 30mm 30mm 30mm;
            }
            body {
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body class="font-sans m-0 p-0">
          
          <div class="bg-[#700C08] text-white px-4 py-1 rounded-r-full inline-block mb-2">
            ${category}
          </div>
          <h1 class="text-2xl font-bold mb-4">${title}</h1>
          <h3 class="text-xl text-gray-600 mb-4">By ${author}</h3>

          <div class="flex justify-center mb-5">
            <img class="w-2/3 h-auto" src="${coverImageUrl}" alt="Cover Image" />
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Summary</h2>
            <p class="text-justify">${summary}</p>
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Key Words</h2>
            <p class="text-justify">${keywords}</p>
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Content</h2>
            <p class="text-justify">${content}</p>
          </div>

          <div class="mb-6">
            <h2 class="text-xl font-semibold mb-2">References</h2>
            <p class="text-justify">${references}</p>
          </div>
        </body>
      </html>
    `);

    await page.waitForSelector("img", { visible: true });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: 30,
        right: 20,
        bottom: 30,
        left: 20,
      },
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${title}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error generating PDF", { status: 500 });
  }
}
