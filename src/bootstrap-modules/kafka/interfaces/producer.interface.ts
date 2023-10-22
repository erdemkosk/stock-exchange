import { IKafkaAbstract } from './abstract.interface';

export interface IProducer extends IKafkaAbstract {
  produce: (message: any) => Promise<void>;
}
