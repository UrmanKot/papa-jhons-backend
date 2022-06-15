import {BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {ProductCategoryType} from '../enums/product-category.type';

@Entity({name: 'products'})
@ObjectType()
export class ProductNode {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly idNumber: number;

  @Column({default: ''})
  @Field()
  id: string;

  @CreateDateColumn({type: 'timestamp'})
  @Field()
  createdAt: Date;

  @CreateDateColumn({type: 'timestamp'})
  @Field()
  updatedAt: Date;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column({nullable: true})
  @Field({nullable: true})
  image?: string;

  @Column({default: ProductCategoryType.PIZZA, enum: ProductCategoryType, type: 'enum'})
  @Field(() => ProductCategoryType)
  category: ProductCategoryType;

  @Column()
  @Field({description: 'Цена'})
  price: number;

  @Column({nullable: true})
  @Field({nullable: true, description: 'Цена по скидке'})
  salePrice?: number;

  @Column({nullable: true})
  @Field({nullable: true, description: 'Количество'})
  count?: number;

  @Column({default: false})
  @Field({description: 'Добавить пищевую ценность?'})
  isAddNutritionalValue: boolean;

  @Column({nullable: true})
  @Field({nullable: true, description: 'Белки'})
  proteins?: number;

  @Column({nullable: true})
  @Field({nullable: true, description: 'Жиры'})
  greases?: number;

  @Column({nullable: true})
  @Field({nullable: true, description: 'Углеводы'})
  carbs?: number;

  @Column({nullable: true})
  @Field({nullable: true, description: 'Энергетическая ценность'})
  energyValue?: number;

  @Column({nullable: true})
  @Field({nullable: true, description: 'Вес'})
  weight?: number;

  @BeforeInsert()
  generateId() {
    this.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
