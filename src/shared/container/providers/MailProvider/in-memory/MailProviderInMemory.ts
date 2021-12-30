import { IMailProvider } from '../IMailProvider';

class MailProdiverInMemory implements IMailProvider {
    private message: any[] = [];

    async sendEmail(
        to: string,
        subject: string,
        variables: any,
        path: string,
    ): Promise<void> {
        this.message.push({
            to,
            subject,
            variables,
            path,
        });
    }
}

export { MailProdiverInMemory };
