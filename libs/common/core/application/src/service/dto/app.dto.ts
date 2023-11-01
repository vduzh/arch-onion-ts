/**
 * Data Transfer Objects (DTO) are used to transfer data between the Application Layer and any type of clients.
 *
 * Typically, an application service is called from the presentation layer (optionally) with a DTO as the parameter.

 * It uses domain objects to perform some specific business logic and (optionally) returns a DTO back to the
 * presentation layer.
 *
 * Thus, the presentation layer is completely isolated from domain layer.
 */
export class AppDto<ID> {
  id?: ID;
}
