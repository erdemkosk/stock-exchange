export class HealthLogic {
  static formatUptime(uptime: number): string {
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;

    const days = Math.floor(uptime / secondsInDay);
    const hours = Math.floor((uptime % secondsInDay) / secondsInHour);
    const minutes = Math.floor((uptime % secondsInHour) / secondsInMinute);
    const seconds = Math.floor(uptime % secondsInMinute);

    return `${days} d ${hours} h ${minutes} m ${seconds} s`;
  }
}
