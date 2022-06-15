import {BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {hash} from 'bcrypt';
import {RoleType} from '../../auth/enums/role.type';
import {Field, HideField, ID, ObjectType} from '@nestjs/graphql';

@Entity({name: 'users'})
@ObjectType()
export class UserNode {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly idNumber: number;

  @Column({default: ''})
  @Field()
  id: string;

  @Column()
  @Field()
  email: string;

  @Column({default: ''})
  @Field()
  firstName: string;

  @Column({default: ''})
  @Field()
  lastName: string;

  @Column({default: false})
  @Field()
  isActivated: boolean;

  @Column({default: '', select: false})
  @HideField()
  activationLink: string;

  @Column({nullable: true})
  @Field({nullable: true})
  image?: string;

  @Column({select: false})
  @HideField()
  password: string;

  @CreateDateColumn({type: 'timestamp'})
  @Field()
  createdAt: Date;

  @CreateDateColumn({type: 'timestamp'})
  @Field()
  updatedAt: Date;

  @Column({default: RoleType.USER, enum: RoleType, type: 'enum'})
  @Field(() => RoleType)
  role: RoleType;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  generateId() {
    this.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
