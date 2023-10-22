export interface IKafkaAbstract {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
