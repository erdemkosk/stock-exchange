import { IKafkaAbstract } from './abstract.interface';

export interface IConsumer extends IKafkaAbstract {
  consume: (message: any) => Promise<void>;
}
