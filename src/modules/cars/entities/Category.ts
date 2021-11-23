import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('categories')
class Category {
    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn() // -> @CreateDateColumn() Propriedade nativa
    created_at: Date; // -> do typeorm para tabelas do tipo Date();

    @PrimaryColumn()
    id?: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Category };
