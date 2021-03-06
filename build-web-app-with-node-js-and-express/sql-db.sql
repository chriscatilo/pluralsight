USE [master]
GO
/****** Object:  Database [kodigouk.pluralsight.build-web-app.books]    Script Date: 03/11/2017 01:09:16 ******/
CREATE DATABASE [kodigouk.pluralsight.build-web-app.books]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'kodigouk.pluralsight.build-web-app.books', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\kodigouk.pluralsight.build-web-app.books.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'kodigouk.pluralsight.build-web-app.books_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\kodigouk.pluralsight.build-web-app.books_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [kodigouk.pluralsight.build-web-app.books].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET ARITHABORT OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET  DISABLE_BROKER 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET  MULTI_USER 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET DB_CHAINING OFF 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET DELAYED_DURABILITY = DISABLED 
GO
/* For security reasons the login is created disabled and with a random password. */
/****** Object:  Login [books]    Script Date: 03/11/2017 01:09:16 ******/
CREATE LOGIN [books] WITH PASSWORD=N'ekvJ/JTtnYIHlo/QnllURMAsaz6Ud4206jr7QaPhrps=', DEFAULT_DATABASE=[kodigouk.pluralsight.build-web-app.books], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=ON, CHECK_POLICY=ON
GO
ALTER LOGIN [books] DISABLE
GO
USE [kodigouk.pluralsight.build-web-app.books]
GO
/****** Object:  User [books]    Script Date: 03/11/2017 01:09:16 ******/
CREATE USER [books] FOR LOGIN [books] WITH DEFAULT_SCHEMA=[db_owner]
GO
ALTER ROLE [db_owner] ADD MEMBER [books]
GO
/****** Object:  Table [dbo].[books]    Script Date: 03/11/2017 01:09:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[books](
	[id] [int] NOT NULL,
	[title] [nvarchar](50) NOT NULL,
	[genre] [nvarchar](50) NOT NULL,
	[author] [nvarchar](50) NOT NULL,
	[read] [bit] NOT NULL,
 CONSTRAINT [PK_books] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[books] ([id], [title], [genre], [author], [read]) VALUES (1, N'War and Peace', N'Historical Fiction', N'Lev Nikolayevich', 0)
INSERT [dbo].[books] ([id], [title], [genre], [author], [read]) VALUES (2, N'Les Misérable', N'Historical Fiction', N'Victor Hugo', 0)
INSERT [dbo].[books] ([id], [title], [genre], [author], [read]) VALUES (3, N'The Time Machine', N'Science Fiction', N'H. G. Wells', 0)
INSERT [dbo].[books] ([id], [title], [genre], [author], [read]) VALUES (4, N'A Journey into the Center of the Earth', N'Science Fiction', N'Jules Verne', 0)
INSERT [dbo].[books] ([id], [title], [genre], [author], [read]) VALUES (5, N'The Dark World', N'Fantasy', N'Henry Kuttner', 0)
INSERT [dbo].[books] ([id], [title], [genre], [author], [read]) VALUES (6, N'The Wind in the Willows', N'Fantasy', N'Kenneth Grahame', 0)
INSERT [dbo].[books] ([id], [title], [genre], [author], [read]) VALUES (7, N'LIfe On The Mississippi', N'History', N'Mark Twain', 0)
INSERT [dbo].[books] ([id], [title], [genre], [author], [read]) VALUES (8, N'Childhood', N'Biography', N'Lev Nikolayevich Tolstoy', 0)
USE [master]
GO
ALTER DATABASE [kodigouk.pluralsight.build-web-app.books] SET  READ_WRITE 
GO
