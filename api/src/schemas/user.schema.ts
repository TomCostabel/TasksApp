import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true //----------> Esto lo que hace es agregarle las fechas de creacion y actualizacion
})
export class User {
  @Prop({
    required: true,
    trim: true
  })
  name: string;

  @Prop({
    required: true,
    trim: true
  })
  lastName: string;

  @Prop({
    unique: true,
    required: true,
    trim: true
  })
  email: string;
  @Prop({
    required: true,
    trim: true
  })
  password: string;

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
    type: [{
      title: String,
      check: Boolean,
      id: String,
      subTasks: [{
        title: { type: String, required: true },
        subTaskCheck: { type: Boolean, default: false },
        id: { type: String, required: true }
      }]
    }],
    default: []
  })
  tasks: { title: string; check: boolean; id: string, subTasks: Array<{ title: string, subTaskCheck: boolean, id: string }> }[];

}

export const userSchema = SchemaFactory.createForClass(User);