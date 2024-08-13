import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  timestamps: true //----------> Esto lo que hace es agregarle las fechas de creacion y actualizacion
})
export class User {
  @Prop({
    required: true,
    trim: true
  })
  name: string

  @Prop({
    required: true,
    trim: true
  })
  lastName: string

  @Prop({
    unique: true,
    required: true,
    trim: true
  })
  email: string

  @Prop({
    required: true,
    trim: true
  })
  password: string

  @Prop({
    unique: true,
    required: true
  })
  id: string;

  @Prop({
    required: true
  })
  isActive: boolean;

  @Prop({
    required: true
  })
  isLogin: boolean;

  @Prop({
    required: true,
    type: [{ title: String, check: Boolean, id: String }],
    default: []
  })
  tasks: { title: string; check: boolean; id: string }[];


}

export const userSchema = SchemaFactory.createForClass(User)