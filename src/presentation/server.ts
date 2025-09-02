import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";

interface Options {
    port: number;
    public_path: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, public_path } = options;
        this.port = port;
        this.publicPath = public_path;
    }

    async start() {
        // Middlewares

        //Public Folder
        this.app.use(express.static(this.publicPath));

        // Catch-all para cualquier otra ruta
        this.app.use((req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on por ${this.port}`);
        });
    }
}