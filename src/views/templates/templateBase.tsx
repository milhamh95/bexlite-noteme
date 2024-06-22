import { PropsWithChildren } from "@kitajs/html";

export const TemplateBase = ({ children }: PropsWithChildren) => {
    return (
        <html>
            <head>
            <meta charset= "UTF-8" />
                <meta name="viewport" content="width-device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}