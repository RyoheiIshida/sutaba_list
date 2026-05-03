import { getDb } from '@/lib/db/sqlite';
import { User, UserRole } from '@/lib/types/auth';

export class UserRepository {
  private db = getDb();

  findByEmail(email: string): User | undefined {
    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  }

  findById(id: number): User | undefined {
    const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  }

  create(userData: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
  }): User {
    const stmt = this.db.prepare(`
      INSERT INTO users (email, password, name, role)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(
      userData.email,
      userData.password,
      userData.name,
      userData.role || 'user'
    );

    return this.findById(result.lastInsertRowid as number)!;
  }

  update(id: number, userData: Partial<{
    name: string;
    role: UserRole;
  }>): User | undefined {
    const fields: string[] = [];
    const params: any[] = [];

    if (userData.name !== undefined) {
      fields.push('name = ?');
      params.push(userData.name);
    }

    if (userData.role !== undefined) {
      fields.push('role = ?');
      params.push(userData.role);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);

    const stmt = this.db.prepare(`
      UPDATE users SET ${fields.join(', ')} WHERE id = ?
    `);

    stmt.run(...params);
    return this.findById(id);
  }

  delete(id: number): boolean {
    const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  findAll(): User[] {
    const stmt = this.db.prepare('SELECT * FROM users ORDER BY created_at DESC');
    return stmt.all() as User[];
  }
}
