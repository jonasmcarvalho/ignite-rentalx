import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRquest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationRepository) { }

    execute({ name, description }: IRquest): void {
        const specificationsAlreadyExists =
            this.specificationsRepository.findByName(name);

        if (specificationsAlreadyExists) {
            throw new Error('Specifications already existis');
        }

        this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
