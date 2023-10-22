import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'kafkajs';
import { KafkajsProducer } from './kafkajs.producer';
import { IProducer } from './interfaces';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>();

  constructor(private readonly configService: ConfigService) {}

  async produce(topic: string, message: Message) {
    const producer = await this.getProducer(topic);
    await producer.produce(message);
  }

  private async getProducer(topic: string) {
    console.log(
      '!!!!!!!!!!!!!!!!!!!!!!!!!!!__' +
        this.configService.get('kafka.kafkaBrokers'),
    );
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkajsProducer(
        topic,
        this.configService.get('kafka.kafkaBrokers'),
      );
      await producer
        .connect()
        .catch((error) => console.log('AMKAMKAMAKMAKMAK'));
      this.producers.set(topic, producer);
    }
    return producer;
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }
}
