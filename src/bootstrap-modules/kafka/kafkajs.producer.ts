import { Logger } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';
import { IProducer } from './interfaces';

export class KafkajsProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(private readonly topic: string, broker: string) {
    this.kafka = new Kafka({
      clientId: 'example-producer',
      brokers: [broker],
    });
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic);
  }

  async produce(message: Message) {
    this.producer
      .send({ topic: this.topic, messages: [message] })
      .catch((e) => console.error(`[example/producer] ${e.message}`, e));
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      await new Promise<void>((resolve) => setTimeout(resolve, 5000));
      await this.connect();
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
