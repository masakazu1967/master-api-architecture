# Contributing to Mastering API Architecture

## Introduction

Welcome to the Mastering API Architecture project! We appreciate your interest in contributing to our project. This document outlines the guidelines and best practices for contributing to the project. Following these guidelines helps ensure a smooth and efficient collaboration among all contributors.

## Development Methodology

### Domain-Driven Design (DDD)

We use Domain-Driven Design (DDD) as our software development methodology. DDD emphasizes the importance of the domain and the collaboration between domain experts and developers. It uses a common language (Ubiquitous Language) shared by all team members to ensure clear communication and accurate modeling of the domain.

#### Core Principles

- **Focus on the Domain**: The primary focus is on the domain and its complexities.
- **Collaboration**: Close collaboration between domain experts and developers.
- **Ubiquitous Language**: A common language shared by all team members.
- **Iterative Refinement**: Continuously refine the domain model.

#### Building Blocks

- **Entities**: Objects with distinct identities and lifecycles.
- **Value Objects**: Immutable objects defined by their attributes.
- **Aggregates**: Clusters of related entities and value objects.
- **Repositories**: Interfaces for accessing and persisting aggregates.
- **Services**: Operations that do not naturally fit within entities or value objects.
- **Factories**: Methods for creating complex objects and aggregates.

#### Strategic Design

- **Bounded Contexts**: Explicit boundaries within which a particular model is defined.
- **Context Maps**: Visual representations of relationships between bounded contexts.
- **Subdomains**: Different areas of the domain with distinct characteristics.

### Onion Architecture

We adopt the Onion Architecture for our software architecture. The Onion Architecture emphasizes the separation of concerns and the use of layers to organize the codebase. It follows the dependency rule: code dependencies can only point inwards.

#### Core Principles

- **Separation of Concerns**: Organize the codebase into layers.
- **Dependency Rule**: Code dependencies can only point inwards.

#### Layered Structure

- **Domain Layer**: Contains business logic and domain entities.
- **Application Layer**: Contains application logic and services.
- **Infrastructure Layer**: Contains implementation details like database repositories, external services, and controllers.

## Project Structure

Each backend service project has a modular structure, with modules divided by API resources. The module name is used as the folder name.

## Code Organization

### Module Folders

- **Domain Layer**: `domain` folder
- **Application Layer**: `application` folder
- **Infrastructure Layer**: `infrastructure` folder

### Domain Folder Structure

- **Model Folder**: Contains entity and value object classes.
- **Service Folder**: Contains domain services.

### Infrastructure Folder Structure

- **Controller Folder**: Contains controllers.
- **SQL Folder**: Contains database repositories.

## Directory Structure Example

Here is an example of the directory structure using ASCII art:

```
backend/
  attendee/
    domain/
      model/
        - Contains entity and value object classes
      service/
        - Contains domain services
    application/
      - Contains application layer code
    infrastructure/
      controller/
        - Contains controllers
      sql/
        - Contains database repositories
```

## Best Practices for Naming Modules and Folders

- **Use meaningful names**: Clearly describe the purpose and functionality.
- **Consistent naming convention**: Use camelCase for module names and kebab-case for folder names.
- **Avoid abbreviations**: Use full words to avoid confusion.
- **Group related files**: Organize files based on functionality and purpose.
- **Use singular names**: Use singular names for module folders.
- **Keep names short and simple**: Avoid long and complex names.
- **Use lowercase letters**: Maintain consistency and avoid case sensitivity issues.

## Importance of Following Guidelines

Following these guidelines is crucial for facilitating collaboration and onboarding:

- **Collaboration**: Ensures everyone is on the same page, reducing misunderstandings.
- **Onboarding**: Helps new team members get up to speed quickly.
- **Resource**: Serves as a valuable resource for both new and experienced developers.

Thank you for contributing to the Mastering API Architecture project! Your efforts are greatly appreciated.
