// Импортируем декораторы для валидации данных из библиотеки class-validator
import { IsEmail, IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

/**
 * DTO (Data Transfer Object) - объект для передачи данных
 * Этот класс описывает структуру данных, которые приходят от клиента
 * и автоматически валидирует их с помощью декораторов
 */
export class ContactDto {
  // @IsNotEmpty() - поле не может быть пустым (обязательное)
  // @IsString() - поле должно быть строкой
  @IsNotEmpty()
  @IsString()
  name: string; // Имя клиента

  // Телефон также обязательный и должен быть строкой
  @IsNotEmpty()
  @IsString()
  phone: string; // Телефон клиента

  // @IsOptional() - поле необязательное, может отсутствовать
  // Знак "?" означает, что свойство может быть undefined
  @IsOptional()
  @IsString()
  comment?: string; // Комментарий клиента (необязательно)

  // Массив выбранных услуг (необязательно)
  // @IsArray() - проверяет, что это массив
  @IsOptional()
  @IsArray()
  selectedServices?: string[]; // Список выбранных услуг
}
