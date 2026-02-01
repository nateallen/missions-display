# Newsletter PDFs

This directory contains missionary newsletter PDF files.

## Directory Structure

```
/public/newsletters/
├── README.md (this file)
├── thumbs/          (Newsletter thumbnail images)
└── *.pdf           (Newsletter PDF files)
```

## Adding Newsletter PDFs

1. **Add PDF files** to this directory
   - Name them descriptively (e.g., `alvarez-2024-01.pdf`, `anderson-fall-2023.pdf`)
   - Keep file sizes reasonable (< 5MB recommended)

2. **Add thumbnail images** to the `thumbs/` subdirectory
   - Create a thumbnail image for each PDF (recommended: 400x300px)
   - Name them to match the PDF (e.g., `alvarez-2024-01.jpg`)

3. **Update newsletter data** in `/src/data/mock/newsletters.ts`
   - Set `pdfUrl` to `/newsletters/your-file.pdf`
   - Set `thumbnailUrl` to `/newsletters/thumbs/your-thumb.jpg`
   - Update `fileSize` and `pageCount` accordingly

## Sample Newsletter Entry

```typescript
{
  id: 'n1',
  missionaryId: 'm1',
  title: 'January 2024 Prayer Letter',
  description: 'Ministry updates and prayer requests',
  publishDate: new Date('2024-01-15'),
  pdfUrl: '/newsletters/alvarez-2024-01.pdf',
  thumbnailUrl: '/newsletters/thumbs/alvarez-2024-01.jpg',
  fileSize: 2456789, // in bytes
  pageCount: 4,
  tags: ['prayer-letter', 'update'],
  featured: true,
}
```

## Creating Thumbnails

You can create thumbnails from PDFs using:

**macOS/Linux:**
```bash
# Using ImageMagick
convert -density 150 newsletter.pdf[0] -quality 90 -resize 400x300 thumb.jpg

# Using ghostscript
gs -sDEVICE=jpeg -dFirstPage=1 -dLastPage=1 -r150 -o thumb.jpg newsletter.pdf
```

**Windows:**
- Use Adobe Acrobat or online PDF tools
- Export first page as JPG image
- Resize to 400x300px

## File Size Guidelines

- **Ideal**: 1-3 MB per PDF
- **Maximum**: 5 MB
- **Compress PDFs** before uploading to reduce file size while maintaining quality

## Notes

- PDFs are publicly accessible at `/newsletters/filename.pdf`
- Newsletter thumbnails appear in the missionary detail page
- PDFs open in a modal viewer in the application
- All PDFs should be optimized for web viewing
