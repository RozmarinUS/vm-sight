import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum RegistryTypes {
  dockerhub = 'dockerhub',
  gitlab = 'gitlab',
  private = 'private',
}
// export type RegistryTypes = 'dockerhub' | 'gitlab' | 'private';

/**
 * @openapi
 * definitions:
 *   updateRegistryDto:
 *     type: object
 *     properties:
 *       name:
 *        type: string
 *        required: false
 *        example: Test name
 *       host:
 *        type: string
 *        required: false
 *        example: 127.0.0.1
 *       username:
 *        type: string
 *        required: false
 *        example: admin
 *       password:
 *        type: string
 *        required: false
 *        example: admin
 */
export class UpdateRegistry {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  host: string;
  @IsOptional()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  password: string;
}

/**
 * @openapi
 * definitions:
 *   createRegistryDto:
 *     type: object
 *     properties:
 *       name:
 *        type: string
 *        required: true
 *        example: Test name
 *       type:
 *        type: string
 *        required: false
 *        example: private
 *       isAuth:
 *        type: boolean
 *        required: false,
 *        example: false
 *       host:
 *        type: string
 *        required: false
 *        example: 127.0.0.1:5000
 *       username:
 *        type: string
 *        required: false
 *        example: admin
 *       password:
 *        type: string
 *        required: false
 *        example: admin
 */
export class CreateRegistry {
  @IsEnum(RegistryTypes)
  @IsString()
  type: RegistryTypes;

  @IsString()
  name: string;

  /**
   * If authentication required
   */
  @IsBoolean()
  @IsNotEmpty()
  isAuth: boolean;

  @IsOptional()
  @IsString()
  host: string;
  @IsOptional()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  password: string;
}
