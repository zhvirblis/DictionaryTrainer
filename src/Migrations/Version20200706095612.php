<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200706095612 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE term ADD dictionary_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE term ADD CONSTRAINT FK_A50FE78DAF5E5B3C FOREIGN KEY (dictionary_id) REFERENCES dictionaries (id)');
        $this->addSql('CREATE INDEX IDX_A50FE78DAF5E5B3C ON term (dictionary_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE term DROP FOREIGN KEY FK_A50FE78DAF5E5B3C');
        $this->addSql('DROP INDEX IDX_A50FE78DAF5E5B3C ON term');
        $this->addSql('ALTER TABLE term DROP dictionary_id');
    }
}
