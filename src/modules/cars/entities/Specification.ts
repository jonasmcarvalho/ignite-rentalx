import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('specifications')
class Specification {
    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @PrimaryColumn()
    id?: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Specification };
