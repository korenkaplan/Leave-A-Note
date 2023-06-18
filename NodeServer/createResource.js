const fs = require('fs');
const path = require('path');

function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  } else {
    console.log(`Folder "${folderPath}" already exists. Skipping folder creation.`);
  }
}

function createFile(folderPath, fileName, fileContent) {
  const filePath = path.join(folderPath, fileName);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Created file: ${filePath}`);
}

const folderPath = 'C:\\Users\\Koren Kaplan\\Desktop\\Projects\\React native\\Leave-A-Note\\NodeServer\\src\\resources';

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Please provide the folder name');
  process.exit(1);
}

const folderName = args[0];
const absoluteFolderPath = path.join(folderPath, folderName);

createFolder(absoluteFolderPath);

const filesToCreate = [
  `${folderName}.controller.ts`,
  `${folderName}.interface.ts`,
  `${folderName}.model.ts`,
  `${folderName}.service.ts`,
  `${folderName}.validation.ts`
];

filesToCreate.forEach((fileName) => {
  let fileContent = `// ${fileName} content`;

  if (fileName === `${folderName}.interface.ts`) {
    fileContent = `import { Document } from 'mongoose';

export default interface ${folderName.charAt(0).toUpperCase() + folderName.slice(1)} extends Document {

};
`;
  } else if (fileName === `${folderName}.controller.ts`) {
    fileContent = `import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';

class ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Controller implements IController {
    public path = '/${folderName}s';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Define your routes here
    }
}

export default ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Controller;
`;
  } else if (fileName === `${folderName}.model.ts`) {
    fileContent = `import { Schema, model } from 'mongoose';
import ${folderName.charAt(0).toUpperCase() + folderName.slice(1)} from '@/resources/${folderName}/${folderName}.interface';

const ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Schema = new Schema(
  {
    // Enter fields here
  },
  { timestamps: true, collection: '${folderName}s' } // Merge options into a single object
);

export default model<${folderName.charAt(0).toUpperCase() + folderName.slice(1)}>('${folderName.charAt(0).toUpperCase() + folderName.slice(1)}', ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Schema);
`;
  } else if (fileName === `${folderName}.service.ts`) {
    fileContent = `import ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Model from '@/resources/${folderName}/${folderName}.model';

class ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Service {
    private ${folderName} = ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Model;
}

export default ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Service;
`;
  } else if (fileName === `${folderName}.validation.ts`) {
    fileContent = `import Joi from 'joi';

export default {
  // Add validation functions here
};
`;
  }

  createFile(absoluteFolderPath, fileName, fileContent);
});
