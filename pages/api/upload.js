import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  // Créer le dossier uploads s'il n'existe pas
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB max
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Erreur lors de l\'upload' });
    }

    const file = Array.isArray(files.screenshot) ? files.screenshot[0] : files.screenshot;
    
    if (!file) {
      return res.status(400).json({ error: 'Aucun fichier reçu' });
    }

    // Vérifier le type de fichier
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      fs.unlinkSync(file.filepath);
      return res.status(400).json({ error: 'Le fichier doit être une image' });
    }

    // Générer un nom unique
    const timestamp = Date.now();
    const ext = path.extname(file.originalFilename || file.newFilename);
    const newFilename = `screenshot-${timestamp}${ext}`;
    const newPath = path.join(uploadDir, newFilename);

    // Renommer le fichier
    try {
      fs.renameSync(file.filepath, newPath);
      
      // Retourner l'URL du fichier
      const fileUrl = `/uploads/${newFilename}`;
      
      res.status(200).json({
        success: true,
        url: fileUrl
      });
    } catch (error) {
      console.error('File rename error:', error);
      res.status(500).json({ error: 'Erreur lors de la sauvegarde du fichier' });
    }
  });
}