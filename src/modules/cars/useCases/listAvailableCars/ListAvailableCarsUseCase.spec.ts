import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory,
        );
    });

    it('Should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 1',
            description: 'Car description',
            daily_rate: 110,
            license_plate: 'XYZ-1234',
            fine_amount: 40,
            brand: 'Car brand',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 2',
            description: 'Car description',
            daily_rate: 110,
            license_plate: 'XYZ-1234',
            fine_amount: 40,
            brand: 'Car brand_test',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: 'Car_brand',
        });

        console.log(cars);
        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 3',
            description: 'Car description name',
            daily_rate: 110,
            license_plate: 'XYZ-1235',
            fine_amount: 40,
            brand: 'Car brand_test name',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: 'Car_brand',
        });

        console.log(cars);
        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 2',
            description: 'Car description',
            daily_rate: 110,
            license_plate: 'XYZ-1234',
            fine_amount: 40,
            brand: 'Car brand_test',
            category_id: '12345',
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: '12345',
        });

        console.log(cars);
        expect(cars).toEqual([car]);
    });
});
