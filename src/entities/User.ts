import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Workspace } from '@sb/entities/Workspace'
import UserInterface from '@sb/interfaces/User'


@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @Column({ unique: true })
    email: string

  @Column()
    shortcutApiToken: string

  @Column()
    googleId: string

  @ManyToOne(() => Workspace, workspace => workspace.users)
  @JoinColumn({ name: 'workspaceId' })
    workspace: Workspace

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
