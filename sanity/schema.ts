import { type SchemaTypeDefinition } from 'sanity'
import user from './schemas/user'
import pin from './schemas/pin'
import postedBy from './schemas/postedBy'
import save from './schemas/save'
import comment from './schemas/comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, pin, postedBy, save, comment],
}
