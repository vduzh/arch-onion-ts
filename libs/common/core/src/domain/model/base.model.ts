/**
 * At the center part of the Onion Architecture, the domain layer exists; this layer represents the business and behavior objects.
 * The idea is to have all of your domain objects at this core. It holds all application domain objects. Besides the domain objects,
 * you also could have domain interfaces. These domain entities don’t have any dependencies. Domain objects are also flat as they should be,
 * without any heavy code or dependencies.
 */
export class BaseModel<ID> {
  constructor(public id: ID | undefined) {}
}
