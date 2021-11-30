import { getRepository, Repository } from 'typeorm';

import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from '@modules/cars/repositories/ISpecificationRepository';

import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name,
        });
        return specification;
    }

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);
    }
}

export { SpecificationsRepository };
