import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

interface IRquest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationRepository,
    ) { }

    async execute({ name, description }: IRquest): Promise<void> {
        const specificationsAlreadyExists =
            await this.specificationsRepository.findByName(name);

        if (specificationsAlreadyExists) {
            throw new AppError('Specifications already existis');
        }

        await this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
