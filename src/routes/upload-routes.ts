import { Router } from "express";
import multer from "multer";

import { UploadsController } from "@/controllers/UploadsController";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorizaation";
import { MULTER, MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/configs/upload";

export const uploadsRouter = Router();
const uploadsController = new UploadsController();

// Filtro de tipo de arquivo
function fileFilter(
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Tipo de arquivo inválido. Apenas imagens JPEG e PNG são permitidas."
      )
    );
  }
}

// Configura multer com limites e filtro
const upload = multer({
  ...MULTER,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

// Middleware de autorização
uploadsRouter.use(verifyUserAuthorization(["employee"]));

// Rota com middleware de upload
uploadsRouter.post("/", upload.single("file"), uploadsController.create);
