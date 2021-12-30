// adicioar coluna avatar na tabela de users
// refatorar usuario com coluna avatar
// configuração de upload com multer
// criar regra de negocio do upload
// criar controller

import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { deleteFile } from '@utils/file';

interface IRquest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) { }

    async execute({ user_id, avatar_file }: IRquest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, 'avatar');
        }

        await this.storageProvider.save(avatar_file, 'avatar');

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };
