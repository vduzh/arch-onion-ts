import { Repository } from '@app/common/core';
import { Note } from '../domain/model/note.model';

/**
 * This layer creates an abstraction between the domain entities and business logic of an application.
 * In this layer, we typically add interfaces that provide object saving and retrieving behavior typically
 * by involving a database. This layer consists of the data access pattern, which is a more loosely coupled
 * approach to data access. We also create a generic repository, and add queries to retrieve data from the source,
 * map the data from data source to a business entity, and persist changes in the business entity to the data source.
 */

// NOTE: You cannot use interfaces since they are not present at runtime, but you can use an abstract class.
export interface NoteRepository extends Repository<Note, string> {}
