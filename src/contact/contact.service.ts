// Импорты из NestJS и библиотек
import { Injectable } from '@nestjs/common'; // Декоратор для создания сервиса
import { ConfigService } from '@nestjs/config'; // Сервис для работы с переменными окружения (.env файл)
import * as nodemailer from 'nodemailer'; // Библиотека для отправки email
import { ContactDto } from './dto/contact.dto'; // Наш DTO класс

/**
 * @Injectable() - декоратор, который говорит NestJS, что этот класс можно внедрять как зависимость
 * Сервис отвечает за бизнес-логику обработки контактных форм
 */
@Injectable()
export class ContactService {
  // Объект для отправки email через nodemailer
  private transporter: nodemailer.Transporter;

  /**
   * Конструктор класса - вызывается при создании экземпляра сервиса
   * NestJS автоматически внедряет ConfigService через Dependency Injection
   */
  constructor(private readonly configService: ConfigService) {
    // Создаем транспортер для отправки email через Gmail SMTP
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP сервер Gmail
      port: 587, // Порт для TLS/STARTTLS
      secure: false, // false для порта 587, true для 465
      auth: {
        // Получаем данные для авторизации из .env файла
        user: this.configService.get<string>('EMAIL_USER'), // Ваш Gmail
        pass: this.configService.get<string>('EMAIL_PASS'), // Пароль приложения Gmail
      },
    });
  }

  /**
   * Главный метод для обработки данных контактной формы
   * async/await - для работы с асинхронными операциями
   */
  async processContactForm(contactData: ContactDto) {
    try {
      // Пытаемся отправить email
      await this.sendContactEmail(contactData);
      
      // Если успешно - возвращаем положительный ответ
      return {
        success: true,
        message: 'Your application has been successfully sent!',
      };
    } catch (error) {
      // Если произошла ошибка - выбрасываем исключение
      // NestJS автоматически преобразует это в HTTP 500 ошибку
      throw new Error('Error sending request');
    }
  }

  /**
   * Приватный метод для отправки email
   * private означает, что метод доступен только внутри этого класса
   */
  private async sendContactEmail(data: ContactDto) {
    // Формируем текст с выбранными услугами
    // Если услуги выбраны - объединяем их через запятую, иначе - "Не выбраны"
    const servicesText = data.selectedServices?.length 
      ? data.selectedServices.join(', ') 
      : 'Не выбраны';

    // Создаем HTML содержимое письма
    // Используем template literals (обратные кавычки) для многострочного текста
    const emailContent = `
      <h2>Новая заявка с сайта MOUN Digital Agency</h2>
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Телефон:</strong> ${data.phone}</p>
      <p><strong>Комментарий:</strong> ${data.comment || 'Не указан'}</p>
      <p><strong>Дополнительные услуги:</strong> ${servicesText}</p>
      <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
    `;

    // Отправляем email используя nodemailer
    await this.transporter.sendMail({
      to: this.configService.get<string>('ADMIN_EMAIL'), // Кому отправляем (ваш email)
      subject: `New application from ${data.name}`, // Тема письма
      html: emailContent, // HTML содержимое
      from: '"MOUN Digital Agency" <noreply@moun.agency>', // От кого письмо
    });
  }
}
