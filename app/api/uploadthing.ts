// pages/api/uploadthing.js
export default function handler(req: { query: { slug: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
    const { slug } = req.query;
    if (slug === 'courseImage') {
      // Handle the upload callback here
      res.status(200).json({ message: 'Callback handled successfully' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }

  // pages/api/uploadthing.js
// export default function handler(req: {query: { slug: any}},) {
//     const { slug } = req.query;
//     if (slug === 'courseImage') {
//       // Handle the upload callback here
//       res.status(200).json({ message: 'Callback handled successfully' });
//     } else {
//       res.status(404).json({ message: 'Not found' });
//     }
//   }
  
  