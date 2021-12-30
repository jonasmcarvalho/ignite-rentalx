import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProdiverInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProdiverInMemory;

describe('Send Forgot Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProdiverInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider,
        );
    });

    it('Should be able to send a forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProvider, 'sendEmail');

        await usersRepositoryInMemory.create({
            driver_license: '847352',
            email: 'hurpanow@ekca.hr',
            name: 'Earl Campbell',
            password: '1234',
        });

        await sendForgotPasswordMailUseCase.execute('hurpanow@ekca.hr');

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should not be able to send an email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('fafjehot@detu.pg'),
        ).rejects.toEqual(new AppError('Users does not exists!'));
    });

    it('Should be able to create an users token', async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            'create',
        );

        usersRepositoryInMemory.create({
            driver_license: '183802',
            email: 'gigju@teb.ao',
            name: 'Myra Paul',
            password: '1234',
        });

        await sendForgotPasswordMailUseCase.execute('gigju@teb.ao');

        expect(generateTokenMail).toBeCalled();
    });
});
